/*
	MIT License

	Copyright (c) 2019 github0null

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

import * as vscode from 'vscode';
import * as crypto from 'crypto';
import * as child_process from 'child_process';
import * as fs from 'fs';

import { WorkspaceManager } from "./WorkspaceManager";
import { CmdLineHandler } from "./CmdLineHandler";
import { ExceptionToMessage } from "./Message";
import { NetRequest, NetResponse } from '../lib/node-utility/NetRequest';
import { File } from '../lib/node-utility/File';
import { GitFileInfo } from './WebInterface/GithubInterface';

export function runShellCommand(title: string, commandLine: string, cmdPath?: string, env?: any): Error | undefined {
    try {
        if (WorkspaceManager.getInstance().hasWorkspaces()) {
            // use task
            const shellOption: vscode.ShellExecutionOptions = { env: env || process.env };
            if (cmdPath) { shellOption.executable = cmdPath; shellOption.shellArgs = ['/C']; }
            const task = new vscode.Task({ type: 'shell' }, vscode.TaskScope.Global, title, 'shell');
            task.execution = new vscode.ShellExecution(commandLine, shellOption);
            task.isBackground = false;
            task.problemMatchers = ['$gcc'];
            task.presentationOptions = { echo: true, focus: false, clear: true };
            vscode.tasks.executeTask(task);
        } else {
            // use terminal
            const index = vscode.window.terminals.findIndex((t) => { return t.name === title; });
            if (index !== -1) { vscode.window.terminals[index].dispose(); }
            const terminal = vscode.window.createTerminal({ name: title, shellPath: cmdPath, env: env || process.env });
            terminal.show(true);
            terminal.sendText(CmdLineHandler.DeleteCmdPrefix(commandLine));
        }
    } catch (error) {
        return error;
    }
}

export function copyObject(src: any): any {
    if (typeof src === 'object') {
        return JSON.parse(JSON.stringify(src));
    } else {
        return src;
    }
}

export function wrapCommand(cmds: string[]): string {
    return cmds.map((cmd) => {
        if (cmd.includes(' ') && !cmd.startsWith('"')) { return `"${cmd}"`; }
        return cmd;
    }).join(' ');
}

export function md5(str: string): string {
    const md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

export function sha256(str: string): string {
    const md5 = crypto.createHash('sha256');
    md5.update(str);
    return md5.digest('hex');
}

export function sha1(str: string): string {
    const md5 = crypto.createHash('sha1');
    md5.update(str);
    return md5.digest('hex');
}

export function openUrl(url: string): Promise<Error | undefined> {
    return new Promise((resolve) => {
        child_process.execFile('explorer', [url], (err, stdout, stderr) => {
            if (err) { resolve(err); }
            else if (stderr) { resolve(new Error(`explorer "${url}" \r\n ${stderr}`)); }
            resolve(undefined);
        });
    });
}

export function compareVersion(v1: string, v2: string): number {

    const v1_li = v1.split('.').filter((s) => s.trim() != '');
    const v2_li = v2.split('.').filter((s) => s.trim() != '');

    // compare per number
    const minLen = Math.min(v1_li.length, v2_li.length);
    for (let index = 0; index < minLen; index++) {
        const v_1 = parseInt(v1_li[index]);
        if (isNaN(v_1)) throw new Error(`version string '${v1}' must only contain 'number' and '.'`);
        const v_2 = parseInt(v2_li[index]);
        if (isNaN(v_2)) throw new Error(`version string '${v2}' must only contain 'number' and '.'`);
        if (v_1 > v_2) return 1;
        if (v_1 < v_2) return -1;
    }

    // if prefix is equal, compare len
    if (v1_li.length > v2_li.length) return 1;
    if (v1_li.length < v2_li.length) return -1;

    return 0;
}

export const toolsUrlMap = {
    "jlink": "https://www.segger.com/downloads/jlink/JLink_Windows_V650.exe",
    "sdcc": "https://sourceforge.net/projects/sdcc/files/latest/download",
    "stlink-utility": "https://www.st.com/zh/development-tools/stsw-link004.html",
    "stvp": "https://www.st.com/zh/development-tools/stvp-stm8.html",
    "arm-gcc": "https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads"
};

const hostMap: any = {
    'api.github.com': [
        'api-github.em-ide.com'
    ],
    'raw.githubusercontent.com': [
        'raw-github.em-ide.com',
        'raw-github.github0null.io'
    ]
};

export function redirectHost(url: string) {

    // replace host
    for (const host in hostMap) {
        const hostList = <string[]>hostMap[host];
        if (hostList.length > 1) {
            const idx = Math.floor(Math.random() * hostList.length); // random index
            url = url.replace(host, hostList[idx]);
        } else {
            url = url.replace(host, hostList[0]);
        }
    }

    return url;
}

export function formatPath(path: string): string {
    return File.ToLocalPath(path.trim().replace(/(?:\\|\/)+$/, ''));
}

export async function downloadFile(url: string): Promise<Buffer | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: Error | Buffer | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        const res = await netReq.RequestBinary<any>({
            host: hostName,
            path: path,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, 'https');

        let result: Buffer | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else {
            result = new Error(`Download file failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export function isVersionString(str: string): boolean {
    return /^\s*\d+(?:\.\d+)+\s*$/.test(str);
}

export async function requestTxt(url: string): Promise<string | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: string | Error | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        const res = await netReq.RequestTxt<any>({
            host: hostName,
            path: path,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, 'https');

        let result: string | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else {
            result = new Error(`Request failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export async function downloadFileWithProgress(url: string, fileLable: string,
    progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken,
    rejectUnauthorized: boolean = true): Promise<Buffer | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: Error | Buffer | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        token.onCancellationRequested(() => {
            netReq.emit('abort');
            resolveIf(undefined);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        let curIncrement: number = 0;

        const res = await netReq.RequestBinary<any>({
            host: hostName,
            path: path,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            rejectUnauthorized: rejectUnauthorized
        }, 'https', (increment) => {
            curIncrement += increment;
            if (curIncrement > 1) { curIncrement = 1; } // limit to 100 %
            progress.report({
                increment: increment * 100,
                message: `${(curIncrement * 100).toFixed(1)}% of '${fileLable}'`
            });
        });

        let result: Buffer | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else if (token.isCancellationRequested === false) {
            result = new Error(`Download file failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export async function getDownloadUrlFromGitea(repo: string, folder: string, fileName: string): Promise<any | Error | undefined> {

    return new Promise(async (resolve) => {

        const req = new NetRequest();

        const res = await req.Request<any, any>({
            host: `git.github0null.io`,
            path: `/api/v1/repos/root/${repo}/contents/${folder}`,
            timeout: 3000,
            headers: { 'User-Agent': 'Mozilla/5.0' },
            rejectUnauthorized: false, // ignore cert failed
        }, 'https');

        if (res.success == false || res.content == undefined) {
            resolve(new Error(res.msg || `Can't connect to git repo !`));
            return;
        }

        let fInfo: any | undefined;

        for (const fileInfo of res.content) {
            if (fileInfo['name'] == fileName) {
                fInfo = fileInfo;
                break;
            }
        }

        resolve(fInfo);
    });
}

export async function readGithubRepoFolder(remoteUrl_: string, token?: vscode.CancellationToken): Promise<GitFileInfo[] | Error> {

    // URL: https://api.github.com/repos/github0null/eide-doc/contents/eide-template-list
    const remoteUrl = remoteUrl_.replace(/^http[s]?:\/\//, '');
    const netReq = new NetRequest();

    let reqError: Error | undefined;
    netReq.on('error', (err) => {
        (<Error>err).message = `Failed to connect '${remoteUrl}'`;
        reqError = err;
    });

    const pathArr = (remoteUrl).split('/');
    const hostName = pathArr[0];
    const path = '/' + pathArr.slice(1).join('/');

    token?.onCancellationRequested(() => {
        netReq.emit('abort');
    });

    const res = await netReq.Request<any, any>({
        host: hostName,
        path: path,
        timeout: 3000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
    }, 'https');

    if (!res.success) {
        const errMsg = res.msg ? `, msg: ${res.msg}` : '';
        return new Error(`Can't connect to github repository !${errMsg}`);
    } else if (res.content === undefined) {
        const errMsg = res.msg ? `, msg: ${res.msg}` : '';
        return new Error(`Can't get content from github repository !${errMsg}`);
    }

    if (reqError) {
        return reqError;
    }

    return <GitFileInfo[]>res.content;
}

export function genGithubHash(f: File | Buffer): string {
    if (f instanceof File) {
        const header = Buffer.from('blob ' + f.getSize() + '\0');
        const buf = Buffer.concat([header, fs.readFileSync(f.path)], header.length + f.getSize());
        const hash = crypto.createHash('sha1');
        hash.update(buf);
        return hash.digest('hex');
    } else {
        const header = Buffer.from('blob ' + f.length + '\0');
        const buf = Buffer.concat([header, f], header.length + f.length);
        const hash = crypto.createHash('sha1');
        hash.update(buf);
        return hash.digest('hex');
    }
}

interface FileCacheInfo {

    version: string;

    files: { name: string; sha: string; }[];
}

export class FileCache {

    private folder: File;
    private cacheFile: File;
    private cache: FileCacheInfo;

    public constructor(rootFolder: File) {
        this.folder = rootFolder;
        this.cacheFile = File.fromArray([rootFolder.path, 'cache.json']);
        this.cache = this.cacheFile.IsFile() ? JSON.parse(this.cacheFile.Read()) : { version: '1.0', files: [] };
    }

    public add(name: string, sha: string) {

        const idx = this.cache.files.findIndex((inf) => inf.name == name);

        if (idx != -1) {
            this.cache.files[idx].sha = sha;
        } else {
            this.cache.files.push({
                name: name,
                sha: sha
            });
        }
    }

    public get(name: string, sha: string): File | undefined {

        const idx = this.cache.files.findIndex((inf) => {
            return inf.name == name && inf.sha == sha;
        });

        if (idx == -1) {
            return undefined;
        }

        const f = File.fromArray([this.folder.path, this.cache.files[idx].name]);
        if (!f.IsFile()) {
            return undefined;
        }

        return f;
    }

    public clear(name?: string) {
        if (name) {
            const idx = this.cache.files.findIndex((inf) => inf.name == name);
            if (idx != -1) {
                this.cache.files.splice(idx, 1);
            }
        } else {
            this.cache.files = [];
        }
    }

    public save() {
        this.cacheFile.Write(JSON.stringify(this.cache));
    }
}

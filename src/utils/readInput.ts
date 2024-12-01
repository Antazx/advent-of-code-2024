import fs from 'node:fs'

export function readInput(path: string) {
    return fs.readFileSync(path, 'utf-8')
}
import { defineConfig } from "rollup";
import typescript from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';

export default defineConfig ({
    plugins: [
        typescript({
            module: 'ESNext'
        }),
        cjs(),
        nodeResolve({
            browser: false
        }),
        json()
    ],
    input: './index.ts',
    output: {
        format: 'cjs',
        name: '[name].js',
        dir: './dist'
    },
    external: [
        'electron',
        'node:net'
    ]
});
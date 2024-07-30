const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const main = async () => {
    const downloads_dir = 'full path to downloads location'
    const acc_num = 'accession number';
    for (let i = 0; i < 750; i++) {
        const file_derivative = JSON.stringify(i).padStart(4, '0');
        const base_path = `${downloads_dir}/${acc_num}`;
        const file_name = `${acc_num}_${file_derivative}`
        const input_file = `${base_path}/${file_name}.png`
        const output_file = `${base_path}/${file_name}.ktx`
        const cmd = `PVRTexToolCLI -i ${input_file} -o ${output_file} -f PVRTC2_4`
        const { stdout, stderr, error } = await (exec(cmd));
        if (error) {
            console.error(error)
            process.exit(1)
        }
        if (stdout) {
            console.log(stdout)
        }
        if (stderr) {
            console.log(stderr)
        }
    }
    if (i === 750) {
        process.exit(0)
    }
}

main();
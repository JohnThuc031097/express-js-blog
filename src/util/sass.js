import fs from 'fs';
import sass from 'node-sass';

const sassRender = (file, outfile, outputStyle) => {
    let isSucess = true;
    sass.render(
        {
            file,
            outfile,
            outputStyle,
        },
        (err, result) => {
            if (!err) {
                // fs.existsSync(outfile) && fs.unlinkSync(outfile);
                fs.writeFileSync(outfile, result.css, (err) => {
                    console.log('[SASS] -> [Error] Writing file CSS: ', err);
                    isSucess = false;
                });
            } else {
                console.log('[SASS] -> [Error] Rendering: ', err);
                isSucess = false;
            }
        },
    );
    if (isSucess) {
        console.log('[SASS] -> [Success] Created file CSS!');
    }
    return isSucess;
};

export { sassRender };

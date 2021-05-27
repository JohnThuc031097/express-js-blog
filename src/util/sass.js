import fs from 'fs';
import nodeSass from 'node-sass';

const sassRenderToCss = (file, mixin) => {
    return nodeSass
        .renderSync(
            {
                // data: `
                //     @use './../resources/scss/${file}';
                //     @include ${mixin};
                //     `,
                data: `
                @use './resources/scss/base';
                @include showDialog();
                `,
                outputStyle: 'nested',
            },
            (err) => {
                console.log('[SASS] -> [Error] ', err);
            },
        )
        .css.toString();
};

const sassRender = (file, outfile, outputStyle) => {
    let isSucess = true;
    nodeSass.render(
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

export { sassRender, sassRenderToCss };

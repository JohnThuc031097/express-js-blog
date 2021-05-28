import fs from 'fs';
import nodeSass from 'node-sass';

const sassRenderToCss = (scssMixin, callMixin) => {
    let result = undefined;
    try {
        result = nodeSass
            .renderSync({
                data: `${scssMixin};@include ${callMixin};`,
                outputStyle: 'compressed',
            })
            .css.toString();
    } catch (error) {
        result = '[SASS] -> [Error]: ' + error;
    }
    return result;
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

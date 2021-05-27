// import nodeSass from "node-sass";
// import sass from 'sass';

export const FormDialog = () => {
    const _$ = document.querySelector.bind();
    let _options = {};

    const setOptions = (ops) => {
        ops && (options = ops);
    };
    // const renderCss = (ops) => {
    //     return nodeSass
    //         .renderSync({
    //             data: `
    //             @use 'index.scss';
    //             @include showDialog("${ops.selector}", "${ops.clsName}", "${ops.type}");
    //             `,
    //             outputStyle: "nested",
    //         }).css.toString();
    // };
    const eventCloseForm = () => {
        const eClose = _$(`.${_options.clsName}-heading-close`);
        return eClose.classList.add('hide');
    };
    return {
        init(ops) {
            setOptions(ops);
        },
        createDialog() {
            const htmlDialog = /*html*/ `
                <div class="col xl-4 md-4 ${_options.clsName}-background">
                    <div class="row ${_options.clsName}-heading">
                        <div class="col xl-11 md-7 ${_options.clsName}-heading-title"></div>
                        <div class="col xl md ${_options.clsName}-heading-close"></div>
                    </div>
                    <div class="row ${_options.clsName}-content">
                        <div class="col xl-max md-max ${_options.clsName}-content-message">
                        </div>
                    </div>
                    <div class="row ${_options.clsName}-confirm">
                        <div class="col xl-6 md-4 text-link ${_options.clsName}-confirm-btn"></div>
                        <div class="col xl-6 md-4 ${_options.clsName}-confirm-btn"></div>
                    </div>
                </div>`;
            _$(`${opsRenderCss.selector}`).classList.add(
                'row ${_options.clsName}',
            );
            _$(`${opsRenderCss.selector}`).classList.innerHTML = htmlDialog;
        },
        showDialog(data) {},
        closeDialog() {
            return eventCloseForm();
        },
    };
};

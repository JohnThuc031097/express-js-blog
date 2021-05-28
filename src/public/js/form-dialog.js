const FormDialog = () => {
    const _$ = document.querySelector.bind(document);
    const _$$ = document.querySelectorAll.bind(document);
    let _options = {};
    let _cssRender = undefined;
    let _rootElement = undefined;

    const setOptions = (ops, css) => {
        ops && (_options = ops);
        css && (_cssRender = css);
        _rootElement = _$(`#${_options.selector}`);
    };
    return {
        init(ops, css) {
            setOptions(ops, css);
            _$(`#${_options.style}`).innerHTML = `<style>${_cssRender}</style>`;
        },
        createDialog() {
            const htmlDialog = /*html*/ `
                <div class="col xl-4 md-4 ${_options.class}-background">
                    <div class="row ${_options.class}-heading">
                    </div>
                    <div class="row ${_options.class}-content">
                        <div class="col xl-max md-max ${_options.class}-content-message">
                        </div>
                    </div>
                    <div class="row ${_options.class}-confirm">
                    </div>
                </div>`;
            _rootElement.classList.add(`${_options.class}`);
            _rootElement.innerHTML = htmlDialog;
        },
        showDialog(data) {
            data && (_options['button'] = { ..._options['button'], ...data });
            // console.log(_options);

            const eHeading = _$(`.${_options.class}-heading`);
            const eContentMessage = _$(`.${_options.class}-content-message`);
            const eConfirm = _$(`.${_options.class}-confirm`);
            const btnList = _options['button'];
            let btnIndex = 1;

            for (const key in btnList) {
                let oBtn = {
                    tag: btnList[key]?.tag, // string
                    attrs: btnList[key]?.attr, // array
                    values: btnList[key]?.value, // array
                    content: btnList[key]?.content, // string
                };

                if (key === 'close') {
                    // Insert HTML into element Heading
                    eHeading.innerHTML = /*html*/ `
                        <div class="col xl-11 md-7 ${_options.class}-heading-title">${_options.title}</div>
                        <div class="col xl md ${_options.class}-heading-close"></div>
                    `;
                    // Add Attributes into element
                    const eHeadingClose = _$(
                        `.${_options.class}-heading-close`,
                    );
                    oBtn?.attrs.forEach((attr, index) => {
                        eHeadingClose.setAttribute(attr, oBtn.values[index]);
                    });
                    // Add Content into element
                    eHeadingClose.innerHTML = oBtn.content;
                } else {
                    let htmlBtn = `
                        <${oBtn.tag} class="col xl-6 md-4 text-link ${_options.class}-confirm-btn"></${oBtn.tag}>
                    `;
                    eConfirm.insertAdjacentHTML('beforeend', htmlBtn);
                    const eBtn = _$(
                        `.${
                            _options.class
                        }-confirm-btn:nth-child(${btnIndex++})`,
                    );
                    oBtn.attrs.forEach((attr, index) => {
                        eBtn.setAttribute(attr, oBtn.values[index]);
                    });
                    eBtn.innerHTML = oBtn.content;
                }
            }
            // console.log(eHeading);
            // console.log(eConfirm);
            eContentMessage.innerHTML = _options.message;
            _rootElement.classList.remove('hide');
        },
        closeDialog() {
            this.createDialog();
            _rootElement.classList.add('hide');
        },
    };
};

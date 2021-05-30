const FormDialog = () => {
    const _$ = document.querySelector.bind(document);
    const _$$ = document.querySelectorAll.bind(document);
    let _formOptions = {};
    let _formInfo = {};
    let _formData = {};
    let _cssRender = undefined;
    let _rootElement = undefined;

    const setOptions = (ops, css) => {
        ops && (_formOptions = ops);
        css && (_cssRender = css);
        _rootElement = _$(`#${_formOptions.selector}`);
    };
    return {
        init(ops, css) {
            setOptions(ops, css);
            _$(
                `#${_formOptions.style}`,
            ).innerHTML = `<style>${_cssRender}</style>`;
        },
        createDialog(formInfo) {
            formInfo && (_formInfo = formInfo);
            const htmlDialog = /*html*/ `
                <div class="col xl-4 md-4 ${_formOptions.class}-background">
                    <div class="row ${_formOptions.class}-heading">
                    </div>
                    <div class="row ${_formOptions.class}-content">
                        <div class="col xl-max md-max ${_formOptions.class}-content-message">
                        </div>
                    </div>
                    <div class="row ${_formOptions.class}-footer">
                    </div>
                </div>`;
            _rootElement.classList.add(`${_formOptions.class}`);
            _rootElement.innerHTML = htmlDialog;
        },
        showDialog(formData) {
            formData && (_formData = formData);

            const eHeading = _$(`.${_formOptions.class}-heading`);
            const eContentMessage = _$(
                `.${_formOptions.class}-content-message`,
            );
            const eFooter = _$(`.${_formOptions.class}-footer`);
            const btnList = _formData['button'];
            let btnIndex = 1;

            // Insert HTML into element Heading
            eHeading.innerHTML = /*html*/ `
                        <div class="col xl-11 md-7 ${_formOptions.class}-heading-title">${_formInfo.title}</div>
                        <div class="col xl md ${_formOptions.class}-heading-close">X</div>
                    `;
            const eHeadingTitle = _$(`.${_formOptions.class}-heading-title`);
            const eHeadingClose = _$(`.${_formOptions.class}-heading-close`);
            switch (_formInfo.type) {
                case 'warn':
                    eHeadingTitle.style.color = 'rgb(238, 141, 51)';
                    break;
                case 'success':
                    eHeadingTitle.style.color = 'rgb(6, 177, 57)';
                    break;
                case 'error':
                    eHeadingTitle.style.color = 'rgb(216, 20, 20)';
                    break;
                default:
                    eHeadingTitle.style.color = 'rgb(33, 33, 219)';
                    break;
            }
            // Add event default
            eHeadingClose.addEventListener('click', () => {
                this.closeDialog();
            });

            btnList.forEach((btn) => {
                btn?.tag || (btn['tag'] = 'button'); // string
                btn?.attrs || (btn['attrs'] = []); // array
                btn?.values || (btn['values'] = []); // array
                btn?.content || (btn['content'] = ''); // string
                btn?.isExit || (btn.isExit = false); // boolean

                let htmlBtn = `
                        <${btn.tag} class="text-link ${_formOptions.class}-footer-btn"></${btn.tag}>
                    `;
                eFooter.insertAdjacentHTML('beforeend', htmlBtn);
                const btnChild = _$(
                    `.${
                        _formOptions.class
                    }-footer-btn:nth-child(${btnIndex++})`,
                );
                btn?.attrs.forEach((attr, index) => {
                    btnChild.setAttribute(attr, btn.values[index]);
                });
                btnChild.innerHTML = btn.content;
                if (btn.isExit) {
                    // Add event default
                    btnChild.addEventListener('click', () => {
                        this.closeDialog();
                    });
                }
            });

            eContentMessage.innerHTML = _formInfo.message;
            _rootElement.action = _formData.value;
            _rootElement.classList.remove('hide');
        },
        closeDialog() {
            this.createDialog(_formInfo);
            _rootElement.action = '/';
            _rootElement.classList.add('hide');
        },
    };
};

const FormDialog = () => {
    const _$ = document.querySelector.bind(document);
    const _$$ = document.querySelectorAll.bind(document);
    let _options = {};
    let _data = {};
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
        createDialog(data) {
            data && (_data = data);
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
        showDialog(addData) {
            _data && (_data = { ..._data, addData });
            console.log(_options);

            const eHeading = _$(`.${_options.class}-heading`);
            const eHeadingTitle = _$(`.${_options.class}-heading-title`);
            const eHeadingClose = _$(`.${_options.class}-heading-close`);
            const eContentMessage = _$(`.${_options.class}-content-message`);
            const eConfirm = _$(`.${_options.class}-confirm`);
            const btnList = _data['button'];
            let btnIndex = 1;

            // Insert value
            _rootElement.action = _data.value;

            // Insert HTML into element Heading
            eHeading.innerHTML = /*html*/ `
                        <div class="col xl-11 md-7 ${_options.class}-heading-title">${_options.title}</div>
                        <div class="col xl md ${_options.class}-heading-close"></div>
                    `;
            switch (_data.type) {
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

            // Add Content into element
            eHeadingClose.innerHTML = oBtn.content;

            for (const key in btnList) {
                let oBtn = {
                    tag: btnList[key]?.tag || '', // string
                    attrs: btnList[key]?.attr || [], // array
                    values: btnList[key]?.value || '', // array
                    content: btnList[key]?.content || '', // string
                    isExit: btnList[key]?.isExit || false, // boolean
                };

                let htmlBtn = `
                        <${oBtn.tag} class="text-link ${_options.class}-confirm-btn"></${oBtn.tag}>
                    `;
                eConfirm.insertAdjacentHTML('beforeend', htmlBtn);

                const eBtn = _$(
                    `.${_options.class}-confirm-btn:nth-child(${btnIndex++})`,
                );
                oBtn.attrs.forEach((attr, index) => {
                    eBtn.setAttribute(attr, oBtn.values[index]);
                });
                eBtn.innerHTML = oBtn.content;
                if (oBtn.isExit) {
                    // Add event default
                    eHeadingClose.addEventListener('click', () => {
                        this.closeDialog();
                    });
                }
            }

            eContentMessage.innerHTML = _options.message;
            _rootElement.classList.remove('hide');
        },
        closeDialog() {
            this.createDialog(_data);
            _rootElement.action = '/';
            _rootElement.classList.add('hide');
        },
    };
};

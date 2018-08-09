const ButtonEnable = (textBoxClass, buttonClass) => {
    let form = document.getElementsByClassName(textBoxClass) && document.getElementsByClassName(textBoxClass)[0];
    let button = document.getElementsByClassName(buttonClass) && document.getElementsByClassName(buttonClass)[0];
    if(form.value) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

export {ButtonEnable};
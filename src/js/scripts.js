const ButtonEnable = (textBoxClass, buttonClass) => {
    let form = document.getElementsByClassName(textBoxClass) && document.getElementsByClassName(textBoxClass)[0];
    let button = document.getElementsByClassName(buttonClass) && document.getElementsByClassName(buttonClass)[0];
    if(form.value) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

const EnterKeyPress = (event, callback, textBoxClass) => {
    let textBox = document.getElementsByClassName(textBoxClass) && document.getElementsByClassName(textBoxClass)[0];
    if(event.keyCode == 13 && textBox.value) {
        callback();
    }
}

export {ButtonEnable, EnterKeyPress};
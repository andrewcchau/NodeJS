let message = "button message",
    handle = "TesterHandle",
    name = "Tester",
    img = "https://http.cat/404",
    date = "December 17, 1995 03:24:00",
    id = "123456";

let json = (message, handle, name, img, created, id) => {
    return '[{"twitterMessage":"' + message + '",' +
            '"user": {' +
                '"twitterHandle":"' + handle + '",' +
                '"name":"' + name + '",' +
                '"profileImageURL":"' + img +
            '"},' +
            '"createdAt":"' + created + '",' +
            '"id":"' + id + '"}]';
}

const JsonObj = JSON.parse(json(message, handle, name, img, date, id));

export default JsonObj;
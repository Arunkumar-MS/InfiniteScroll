export const get = (url: string): Promise<any> => {
    const xhr = new XMLHttpRequest();
    return new Promise((reslove, reject) => {
        const handelResponse = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    return reslove(data);
                }
                catch (e) {
                    // Log
                    reject({ status: xhr.status });
                }
            }
            // Log status 
            reject({ status: xhr.status });
        };

        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = handelResponse;
    });
}

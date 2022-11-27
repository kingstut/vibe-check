const API_KEY = "dummy";

function fetchImgs( data, API_KEY) {
    return new Promise((resolve, reject) => {
        // Send post request to inference API
        return fetch(
            "https://api-inference.huggingface.co/models/lambdalabs/sd-image-variations-diffusers",
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
                method: "POST",
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(json => {
            console.log(json);
            if (Array.isArray(json)) {
                const imgs = Array();
                for (let i = 0; i < json.length; i++) {
                    const img = json[i].sample;
                    imgs.push(img);
                }

                resolve({ imgs });
            }
            else {
                console.log(json);
                throw new Error("error");
            }
        })
            .catch(err => reject(err));
    });
}

const provider = {
    provideImgs: async (img) => {
        let rs;
        try {
            // Fetch the images
            rs = await fetchImgs(img, API_KEY);
            //console.log(rs);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.toString());
            }
            return { imgs: [] };
        }
        if (rs == null) {
            return { imgs: [] };
        }

        // Change Image
        img.src = rs.imgs

    }
}


const imgs = document.getElementsByTagName("img");
for (let i=0; i<imgs.length; i++) {
    provider.providerImgs(imgs[i]);
}

//provider.provideImgs('sample.jpg')

const blogTitleField = document.querySelector('.title')
const articleField = document.querySelector('.article');

//banner
const bannerImage = document.querySelector('#banner-upload')
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image")
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData()
        formdata.append('image', file)

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data} `;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }

            })
    } else {
        alert("upload image only")
    }
}

const addImage = (image_path, alt) => {
    let curPos = articleField.selectionStart //will give cursor position so that we can add image text to it
    let textToInsert = `\r![${alt}](${image_path})\r`  //our image inside article editor will be in this format
    articleField.value = articleField.value.slice(0, curPos) +
        textToInsert +
        articleField.value.slice(curPos)
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        // generating ID
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTile = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        //setting up docName
        let docName = `${blogTile}-${id}`;
        let date = new Date(); // for published at info

        //access firestore with db variable
        db.collection("blogs").doc(docName).set({
            //this creates a new document in our firestore
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()}${months[date.getMonth()]}${date.getFullYear()}`
        }).then(() => {
            //console.log("Data entered")
            location.href = `/${docName}`
        }).catch((err) => {
            console.error(err);
        })
    }
})


const showLoader=()=>{
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("video_Container").classList.add("hidden")
}
const hiddenLoader=()=>{
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("video_Container").classList.remove("hidden")
}

function removeButton() {
    const activeButton = document.getElementsByClassName("active");
    for (let btn of activeButton) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    // 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        // 2-convert promise to json
        .then((res) => res.json())

        // 3-send Data to Display
        .then((data) => displayCategories(data.categories))

}

function loadVideo(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            removeButton()
            document.getElementById('all-btn').classList.add("active")
            displayVideo(data.videos)
        })
}

function loadVideoCategories(id) {

showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeButton();

            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            console.log(clickedButton);
            displayVideo(data.category)
        })

}

const loadVideoDetails = (id) => {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLoadVideoDetails(data.video))
}


const displayLoadVideoDetails = (video) => {
    console.log(video);
    document.getElementById("open_modal").showModal();

    const videoDetails = document.getElementById("details_Container");

    videoDetails.innerHTML = `
    <h1>${video.title}</h1>
    `;

}



function displayCategories(categories) {
    // get the container
    const categoriesContainer = document.getElementById('category_container');

    // Loop operation  on Array of object
    for (let cat of categories) {

        // create Element
        const div = document.createElement("div");
        div.innerHTML = `
         <button id='btn-${cat.category_id}' onclick=" loadVideoCategories(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
        // Append Child
        categoriesContainer.append(div)

    }




}


const displayVideo = (videos) => {

    const category_Video = document.getElementById('video_Container');

    category_Video.innerHTML = "";

    if (videos.length === 0) {
        category_Video.innerHTML = `
         <div class="flex flex-col items-center col-span-full py-20">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h1 class="font-bold text-2xl">Oops!! Sorry, There is no content here</h1>
        </div>
        `
        hiddenLoader();
        return;
    }

    videos.forEach(video => {
        // console.log(video)

        const div = document.createElement("div");
        div.innerHTML = `

       <div class="card   relative">
        <figure class="rounded-md">
            <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
        </figure>

        <div class="card-body px-0 pb-3">
            <div class="flex ">
                <div class="flex gap-2 items-start">

                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <div class="">
                        <h1 class="font-bold text-base">${video.title}</h1>
                        <p class="text-[#171717B3] font-normal text-sm pt-[9px] flex gap-1">
                            ${video.authors[0].profile_name}
                            ${video.authors[0].verified == true ? `<img class="w-5 h-5"
src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">`: ``}
                            </p>
                        <p class="text-[#171717B3] font-normal text-sm py-1">${video.others.views} views</p>
                    </div>

                </div>
                <div class="absolute right-0 bottom-0 pb-3 pr-1">
                    <button onclick="loadVideoDetails('${video.video_id}')" class=" btn btn-sm">Show Details</button>
                </div>
            </div>

        </div>
    </div>

        `;

        category_Video.append(div);

    });



    hiddenLoader();

}

document.getElementById("search-input").addEventListener("keyup",(e)=>{
    const input=e.target.value;
    loadVideo(input);
   
})

loadCategories();
loadVideo();
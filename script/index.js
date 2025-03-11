console.log("hello Mama");


function loadCategories() {
    // 1- fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        // 2-convert promise to json
        .then((res) => res.json())

        // 3-send Data to Display
        .then((data) => displayCategories(data.categories))

}

function loadVideo() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideo(data.videos))
}



function displayCategories(categories) {
    // get the container
    const categoriesContainer = document.getElementById('category_container');

    // Loop operation  on Array of object
    for (let cat of categories) {

        // create Element
        const div = document.createElement("div");
        div.innerHTML = `
         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
        // Append Child
        categoriesContainer.append(div)

    }




}


const displayVideo = (videos) => {

    const category_Video = document.getElementById('video_Container');

    videos.forEach(video => {
        // console.log(video)
        const div = document.createElement("div");
        div.innerHTML=`

       
               <div class="card   ">
                <figure class="rounded-md">
                    <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                </figure>

                <div class="card-body px-0">

                    <div class="flex gap-2 items-start">
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                        <div class="">
                            <h1 class="font-bold text-base">${video.title}</h1>
                            <p class="text-[#171717B3] font-normal text-sm pt-[9px] flex gap-1">${video.authors[0].profile_name}<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt=""></p>
                            <p class="text-[#171717B3] font-normal text-sm py-1">${video.others.views} views</p>
                        </div>
                    </div>

                </div>
            </div>
        `;

        category_Video.append(div);

    });

   



}

loadCategories();
loadVideo();
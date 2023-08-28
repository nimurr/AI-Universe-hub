
const loadAiApi = async (isShowAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json();
    const AllAi = data.data.tools;
    displayAiItems(AllAi, isShowAll);
}

const displayAiItems = (data, isShowAll) => {
    const items = document.getElementById('items');
    items.innerHTML = '';

    const showallbtn = document.getElementById('showallbtn');
    if (data.length > 6 && !isShowAll) {
        showallbtn.classList.remove('hidden')
    }
    else {
        showallbtn.classList.add('hidden')
    }

    if (!isShowAll) {
        data = data.slice(0, 6);
    }


    data.forEach(item => {
        console.log(item)



        const displayDiv = document.createElement('div');

        displayDiv.classList.add = 'card bg-base-100 shadow-xl';
        displayDiv.innerHTML = `
            <figure><img class="h-60 w-full" src="${item.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${item.features[0]}</h2>
                <ol class='list-decimal'>
                    <li>${item.features[0]}</li>
                    <li>${item.features[1]}</li>
                    <li>${item.features[2]}</li>
                </ol>
                <hr/>
                
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="card-title">${item.name}</h2>
                        <div class="flex items-center gap-2">
                            <i class='bx bx-calendar'></i>${item.published_in} <span></span>
                        </div>
                    </div>
                    <div>
                    <button class="text-red-300" onclick="modalApi('${item.id}')">Show More > </button>
                    </div>
                </div>
            </div>
        `


        items.appendChild(displayDiv)

    })
}

const handlerShowAll = () => {
    loadAiApi(true);
}

const modalApi = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    showMoreBtn(data);
}
const showMoreBtn = (data) => {

    // console.log(data.data)

    const modalDiscription = document.getElementById('modal-discription');
    modalDiscription.innerText = data.data.description;


    const Price1 = document.getElementById('Price-1');
    Price1.innerText = data.data.pricing[0].price;
    const Price2 = document.getElementById('Price-2');
    Price2.innerText = data.data.pricing[1].price;
    const Price3 = document.getElementById('Price-3');
    Price3.innerText = data.data.pricing[2].price;


    const FeaturesList = document.getElementById('Features-list');
    FeaturesList.innerHTML = ''

    const list = document.createElement('li');

    const datas = data.data.features;
    for (const data in datas) {
        // console.log(datas[data].feature_name);
        list.innerText = datas[data].feature_name;
    }
    FeaturesList.appendChild(list); 

    // console.log(data.data.input_output_examples[0].input)

    const modalImg = document.getElementById('modalImg');
    modalImg.innerHTML = `
    <img class="rounded-xl overflow-hidden" src="${data.data.image_link[0]}"/>
    <h1 class="text-xl text-center my-4">${data.data.input_output_examples[0].input}</h1>
    <p class="text-center "> ${data.data.input_output_examples[0].output}</p>

    `


    my_modal_4.showModal();
}





loadAiApi();
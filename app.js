const gateInfo = {

    "골든루체뷰1":[
        "1~14호 → 닥엔돈스 옆문",
        "15~28호 → 닥엔돈스 맞은편"
    ],

    "럭스A":[
        "1~38호, 87~90호 → 1게이트 (쓰레기장쪽)",
        "49~67호 → 2게이트 (CU와 비타민부동산 사이)",
        "39~48호, 68~86호 → 3게이트 (지하주차장 옆)"
    ],

    "럭스B":[
        "1~20호, 47~50호 → 1게이트 (지하주차장 옆)",
        "21~46호 → 2게이트 (어린왕자 조형물 오른쪽 뒤 골목)"
    ],

    "썬앤빌":[
        "A1~26, A85~100 → A1게이트",
        "A27~49, A72~84 → A2게이트",
        "A50~71, B93~104 → A3게이트",
        "B1~10, B79~92, B105~114 → B1게이트",
        "B11~32, B66~78 → B2게이트",
        "B33~65 → B3게이트"
    ]

};

window.onload = function(){

    showRegions();

};

function showRegions(){

    let html = `
    <div class="buttonGrid2">
    `;

    Object.keys(apartmentData)
    .forEach(region=>{

        html += `
        <button
        onclick="showApartments('${region}')">

        ${region}

        </button>
        `;

    });

    html += `
    </div>
    `;

    document.getElementById("screen")
    .innerHTML = html;

}

function showApartments(region){

    let html = `

    <button
    class="navBtn"
    onclick="showRegions()">

    🏠 홈

    </button>

    <div class="path">
    ${region}
    </div>

    <div class="buttonGrid3">

    `;

    Object.keys(apartmentData[region])
    .forEach(apartment=>{

        html += `
        <button
        onclick="showDongs(
        '${region}',
        '${apartment}'
        )">

        ${apartment}

        </button>
        `;

    });

    html += `
    </div>
    `;

    document.getElementById("screen")
    .innerHTML = html;

}

function showDongs(region, apartment){

    let html = `

    <div class="topButtons">

    <button
    class="navBtn"
    onclick="showRegions()">

    🏠 홈

    </button>

    <button
    class="navBtn"
    onclick="showApartments('${region}')">

    ← 뒤로

    </button>

    </div>

    <div class="path">

    ${region}
    >
    ${apartment}

    </div>

    `;

    const commonPassword =
    getCommonPassword(region, apartment);

    if(commonPassword){

        html += `

        <div class="passwordBox">

        <h3>

        공동비밀번호 :
        ${commonPassword}

        </h3>

        </div>

        `;

    }

    html += `

    <div class="buttonGrid3">

    `;

    Object.keys(
        apartmentData[region][apartment]
    )
    .forEach(dong=>{

        html += `
        <button
        onclick="showPassword(
        '${region}',
        '${apartment}',
        '${dong}'
        )">

        ${dong}

        </button>
        `;

    });

    html += `
    </div>
    `;

    document.getElementById("screen")
    .innerHTML = html;

}

function showPassword(
    region,
    apartment,
    dong
){

    const data =
    apartmentData[region][apartment][dong];

    let html = `

    <div class="topButtons">

    <button
    class="navBtn"
    onclick="showRegions()">

    🏠 홈

    </button>

    <button
    class="navBtn"
    onclick="showDongs(
    '${region}',
    '${apartment}'
    )">

    ← 뒤로

    </button>

    </div>

    <div class="path">

    ${region}
    >
    ${apartment}
    >
    ${dong}

    </div>

    <div class="passwordBox">

    <h2>${apartment}</h2>

    <h3>${dong}</h3>

    `;

    if(data.common){

        html += `
        <p>

        공동비밀번호 :
        ${data.common}

        </p>
        `;

    }

    if(gateInfo[dong]){

    html += `
    <div class="lineBox">

    <h4>게이트 안내</h4>
    `;

    gateInfo[dong].forEach(info=>{

        html += `
        <div>${info}</div>
        `;

    });

    html += `
    </div>
    `;
}

    Object.entries(data.lines)
.forEach(([line,passwords])=>{

    html += `
    <div class="lineBox">
    `;

    if(
        line &&
        line !== "-" &&
        line !== "undefined"
    ){

        html += `
        <h4>
        ${line}라인
        </h4>
        `;

    }

    passwords.forEach(password=>{

        html += `
        <div>
        ${password}
        </div>
        `;

    });

    html += `
    </div>
    `;

});

    html += `
    </div>
    `;

    document.getElementById("screen")
    .innerHTML = html;

}

function getCommonPassword(
    region,
    apartment
){

    const firstDong =
    Object.keys(
        apartmentData[region][apartment]
    )[0];

    const data =
    apartmentData
    [region]
    [apartment]
    [firstDong];

    if(!data){
        return "";
    }

    return data.common || "";

}

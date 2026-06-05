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
        <button onclick="showApartments('${region}')">
        ${region}
        </button>
        `;

    });

    html += `
    </div>
    `;

    document.getElementById("screen").innerHTML = html;

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

    document.getElementById("screen").innerHTML = html;

}

function showDongs(region, apartment){

    console.log("showDongs", region, apartment);
    console.log(apartmentData[region][apartment]);

    const aptData = apartmentData[region][apartment];

    if(aptData.lines){

        showOfficetel(region, apartment);

        return;

    }

...

    let html = `

    <button
    class="navBtn"
    onclick="showApartments('${region}')">

    ← 뒤로

    </button>

    <div class="path">

    ${region}
    >
    ${apartment}

    </div>

    <div class="passwordBox">

    <h3>

    공동비밀번호 :
    ${getCommonPassword(region, apartment)}

    </h3>

    `;

    if(gateInfo[apartment]){

        html += `

        <div class="lineBox">

        <h4>게이트 안내</h4>

        `;

        gateInfo[apartment].forEach(info=>{

            html += `
            <div>${info}</div>
            `;

        });

        html += `
        </div>
        `;

    }

    html += `

    </div>

    <div class="buttonGrid3">

    `;

    Object.keys(apartmentData[region][apartment])
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

    document.getElementById("screen").innerHTML = html;

}

function showOfficetel(region, apartment){

    const password =
    apartmentData[region][apartment]
    .lines["-"][0];

    let html = `

    <button
    class="navBtn"
    onclick="showApartments('${region}')">

    ← 뒤로

    </button>

    <div class="path">

    ${region}
    >
    길건너오피
    >
    ${apartment}

    </div>

    <div class="passwordBox">

    <h2>${apartment}</h2>

    <h3>

    공동비밀번호 :
    ${password}

    </h3>

    `;

    if(gateInfo[apartment]){

        html += `

        <div class="lineBox">

        <h4>게이트 안내</h4>

        `;

        gateInfo[apartment].forEach(info=>{

            html += `
            <div>${info}</div>
            `;

        });

        html += `
        </div>
        `;

    }

    html += `
    </div>
    `;

    document.getElementById("screen").innerHTML = html;

}

function showPassword(
    region,
    apartment,
    dong
){

    const data =
    apartmentData[region][apartment][dong];

    let html = `

    <button
    class="navBtn"
    onclick="showDongs(
    '${region}',
    '${apartment}'
    )">

    ← 뒤로

    </button>

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

    <p>

    공동비밀번호 :
    ${data.common}

    </p>

    `;

    Object.entries(data.lines)
    .forEach(([line,passwords])=>{

        html += `

        <div class="lineBox">

        <h4>
        ${line}
        </h4>

        `;

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

    document.getElementById("screen").innerHTML = html;

}

function getCommonPassword(
    region,
    apartment
){

    const firstDong =
    Object.keys(
        apartmentData[region][apartment]
    )[0];

    return apartmentData
    [region]
    [apartment]
    [firstDong]
    .common;

}

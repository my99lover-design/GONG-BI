window.onload = function(){

    showRegions();

};

function showRegions(){

    let html = "";

    Object.keys(apartmentData)
    .forEach(region=>{

        html += `
        <button
        onclick="showApartments('${region}')">

        ${region}

        </button>
        `;

    });

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

    document.getElementById("screen")
    .innerHTML = html;

}

function showDongs(region, apartment){

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
        ${line}라인
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

    document.getElementById("screen")
    .innerHTML = html;

}

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

</div>

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

    return apartmentData
    [region]
    [apartment]
    [firstDong]
    .common;

}

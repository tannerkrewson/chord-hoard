const notes = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#']

$('#go').on('click', () => {
    let progressions = $('#input').val().split('\n');
    let res = '';

    for (let progression of progressions) {
        res += getAllKeys(progression);
    }

    $('#output').val(res);
});

function getAllKeys(progression) {
    let romans = progression.split('-');
    let offsets = getProgressionOffsetArray(romans);
    let res = '';
    for (let i = 0; i < 12; i++) {

        //example: I–V–vi–IV in C
        res += progression + ' in ' + notes[i];

        res += ',';

        let minors = getProgressionMinorsArray(romans);

        //example: C-G-Am-F
        res += offsetArrayToNotes(i, offsets, minors);

        res += '\n';
    }

    return res;
}

function getNumberOfRoman (roman) {
    roman = roman.toLowerCase();
    switch (roman) {
        case 'i':
            return 0;
        case 'ii':
            return 2;
        case 'iii':
            return 4;
        case 'iv':
            return 5;
        case 'v':
            return 7;
        case 'vi':
            return 9;
        case 'vii':
            return 11;
    }
    alert('bad roman numeral: ' + roman);
    return -1;
}

// I–V–vi–IV => [0, 4, 5, 3]
function getProgressionOffsetArray (romans) {
    let res = [];
    
    for (let roman of romans) {
        res.push(getNumberOfRoman(roman));
    }
    return res;
}

function getProgressionMinorsArray (romans) {
    let res = [];
    for (let note of romans) {
        res.push(isMinor(note));
    }
    return res;
}

function isMinor(roman) {
    return (roman === roman.toLowerCase()) ? 'm' : '';
}

function offsetArrayToNotes (initial, offsetArray, minorArray) {
    let res = '';
    for (let i in offsetArray) {
        let offset = offsetArray[i];

        res += getOffsetNote(initial, offset);
        res += minorArray[i];
        res += '-';
    }

    // slice removes the trailing hyphen
    return res.slice(0, -1);
}

function getOffsetNote(initial, offset) {
    let index = initial + offset;
    return notes[index < 12 ? index : index - 12];
}
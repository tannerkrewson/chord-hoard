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

        let tails = getProgressionTailsArray(romans);

        //example: C-G-Am-F
        res += offsetArrayToNotes(i, offsets, minors, tails);

        res += '\n';
    }

    return res;
}

function getNumberOfRoman (roman) {
    roman = roman.toLowerCase();

    if (roman.startsWith('iii')) {
        return 4;
    } else if (roman.startsWith('ii')) {
        return 2;
    } else if (roman.startsWith('iv')) {
        return 5;
    } else if (roman.startsWith('i')) {
        return 0;
    } else if (roman.startsWith('vii')) {
        return 11;
    } else if (roman.startsWith('vi')) {
        return 9;
    } else if (roman.startsWith('v')) {
        return 7;
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

function getProgressionTailsArray (romans) {
    let res = [];
    for (let note of romans) {
        let thisTail = '';
        if (note.endsWith('maj7')) {
            thisTail += 'maj7';
        } else if (note.endsWith('7')) {
            thisTail += '7';
        }
        res.push(thisTail);
    }
    return res;
}

function isMinor(roman) {
    let first = roman.charAt(0);
    return (first === first.toLowerCase()) ? 'm' : '';
}

function offsetArrayToNotes (initial, offsetArray, minorArray, tailsArray) {
    let res = '';
    for (let i in offsetArray) {
        let offset = offsetArray[i];

        res += getOffsetNote(initial, offset);
        res += minorArray[i];
        res += tailsArray[i];
        res += '-';
    }

    // slice removes the trailing hyphen
    return res.slice(0, -1);
}

function getOffsetNote(initial, offset) {
    let index = initial + offset;
    return notes[index < 12 ? index : index - 12];
}
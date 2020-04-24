
function nb_dot(line) {
    if (line.length <= 0)
        return 0;
        
    let count = 0;
    for (let index = 0; index < line.length; index++) {
        if (line[index] === '.') {
            count++;
        }
    }
    return count;
}

function position_decendant(familly, descendance) {
    for (let position = 0; position < familly.length; position++) {
        if (nb_dot(familly[position]) == descendance) {
            return position;
        }   
    }
    return -1;
}

let families_array = [];
let index_family = 0;
let family_array = [];

let current_deph = 0;

let start = false;

const count = parseInt(readline());
for (let i = 0; i < count; i++) {
    const line = readline();

    let nb_dot_line = nb_dot(line);
    
    if (!nb_dot_line) {
        if (!start) {
            start = true;
        } else {
            families_array[index_family] = family_array;
            family_array = [];
            current_deph = 0;
            index_family++;
        }
        
        families_array[index_family] = [];
    } else if (nb_dot_line) {
        if (nb_dot_line < current_deph) {
            families_array[index_family++] = family_array;
            let position = position_decendant(family_array, nb_dot_line);
            family_array = family_array.slice(0, position);
        } else if (nb_dot_line === current_deph) {
            families_array[index_family++] = family_array;
            let position = position_decendant(family_array, current_deph);
            family_array = family_array.slice(0, position);
        }
        
        current_deph = nb_dot_line;
    }
    
    family_array.push(line);
    
    if (i === (count - 1)) {
        families_array[index_family] = family_array;
    }
}

for (let index = 0; index < families_array.length; index++) {
    console.log(families_array[index].join(" > ").replace(/[.]/g, ''));
}

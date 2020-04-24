
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
let index_familly = 0;
let family_array = [];

let nb_dot_selected = 0;

let start = false;

const count = parseInt(readline());
for (let i = 0; i < count; i++) {
    const line = readline();
    
    if (!nb_dot(line)) {
        if (!start) {
            start = true;
        } else {
            families_array[index_familly] = family_array;
            family_array = [];
            nb_dot_selected = 0;
            index_familly++;
        }
        
        families_array[index_familly] = [];
    } else if (nb_dot(line)) {
        if (nb_dot(line) < nb_dot_selected) {
            families_array[index_familly++] = family_array;
            let position = position_decendant(family_array, nb_dot(line));
            family_array = family_array.slice(0, position);
        } else if (nb_dot(line) === nb_dot_selected) {
            families_array[index_familly++] = family_array;
            let position = position_decendant(family_array, nb_dot_selected);
            family_array = family_array.slice(0, position);
        }
        
        nb_dot_selected = nb_dot(line);
    }
    
    family_array.push(line);
    
    if (i === (count - 1)) {
        families_array[index_familly] = family_array;
    }
}

for (let index = 0; index < families_array.length; index++) {
    console.log(families_array[index].join(" > ").replace(/[.]/g, ''));
}

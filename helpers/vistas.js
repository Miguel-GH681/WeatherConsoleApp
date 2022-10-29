import inquirer from 'inquirer';
import colors from 'colors';


export const menuPrincipal = async ()=>{
    console.clear();
    console.log(`${'========================'.yellow}`);
    console.log(`${'='.yellow}    ${'Clima Mundial'.blue}    ${'='.yellow}`);
    console.log(`${'========================'.yellow}`);

    const choices = [
        {
            value: 1,
            name: `1. Buscar cuidad`
        },
        {
            value: 2,
            name: `2. Ver historial`
        },
        {
            value: 0,
            name: `0. Salir`
        }
    ]

    const menu = [{
        type: 'list',
        name: 'option',
        message: 'Seleccione una opción',
        choices
    }]

    const { option } = await inquirer.prompt(menu)
    return option;
}

export const confirmacion = async ()=>{
    const menu = [{
        type: 'input',
        name: 'confirmacion',
        message: 'Presione enter para continuar'
    }]

    const confirmacion = await inquirer.prompt(menu)
}

export const input = async ()=>{
    const menu = [{
        type: 'input',
        name: 'city',
        message: 'Nombre de la cuidad: '
    }]
    const { city } = await inquirer.prompt(menu);
    return city;
}

export const menuCuidades = async (cuidades = [])=>{
    const choices = cuidades.map((elemento, index) =>({
        value: elemento.id,
        name: `${index + 1}. ${elemento.cuidad}`
    }))

    const menu = [{
        type: 'list',
        name: 'cityId',
        message: 'Seleccione un lugar: ',
        choices
    }]

    const { cityId } = await inquirer.prompt(menu);
    return cityId;
}
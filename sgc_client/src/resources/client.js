const ClientController = {};

ClientController.localeFunc = (number, index, total_sec) => {
    return [
        ['justo ahora', 'ahora mismo'],
        ['%s segundos atrás', 'en %s segundos'],
        ['Hace 1 minuto', 'en 1 minuto'],
        ['%s minutos atrás', 'en %s minutos'],
        ['Hace 1 hora', 'en 1 hora'],
        ['%s horas', 'en %s horas'],
        ['Hace 1 día', 'en 1 día'],
        ['hace %s días', 'en %s días'],
        ['Hace 1 semana', 'en 1 semana'],
        ['%s semanas atrás', 'en %s semanas'],
        ['Hace 1 mes', 'en 1 mes'],
        ['%s meses atrás', 'en %s meses'],
        ['Hace 1 año', 'en 1 año'],
        ['%s años atrás', 'en %s años']
    ][index];
};

ClientController.agregarSesion = (usuario) => {
    for(var key in usuario){
        /*Guardando los datos en el sessionStorage*/
        sessionStorage.setItem(key, usuario[key]);
    }
};

export default ClientController;

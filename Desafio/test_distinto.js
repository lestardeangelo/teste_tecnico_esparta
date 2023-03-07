function solution (array) {
    const distinctValues = {}; // Cria um objeto vazio para armazenar os valores distintos
  
    // Itera sobre cada elemento do array
    for (let i = 0; i < array.length; i++) {
      const value = array[i]; // Armazena o valor atual em uma variável
      
      // Adiciona o valor como uma propriedade no objeto, caso ainda não tenha sido adicionado
      if (!distinctValues[value]) {
        distinctValues[value] = true;
      }
    }
  
    // Retorna o número de propriedades no objeto, que representa o número de valores distintos no array
    return Object.keys(distinctValues).length;
}


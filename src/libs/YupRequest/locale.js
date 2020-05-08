import * as yup from 'yup';

const translation = {
    mixed: {
      default: 'O campo "{{${path}}}" é inválido',
      required: 'O campo "{{${path}}}" é obrigatório',
      oneOf: 'O campo "{{${path}}}" deve conter um dos seguintes valores: ${values}',
      notOneOf: 'O campo "{{${path}}}" não pode conter um dos seguintes valores: ${values}',
    },
    string: {
      length: 'O campo "{{${path}}}" deve ter exatamente ${length} caracteres',
      min: 'O campo "{{${path}}}" deve ter pelo menos ${min} caracteres',
      max: 'O campo "{{${path}}}" deve ter no máximo ${max} caracteres',
      email: 'O campo "{{${path}}}" tem o formato de e-mail inválido',
      url: 'O campo "{{${path}}}" deve ter um formato de URL válida',
      trim: 'O campo "{{${path}}}" não deve conter espaços no início ou no fim.',
      lowercase: 'O campo "{{${path}}}" deve estar em maiúsculo',
      uppercase: 'O campo "{{${path}}}" deve estar em minúsculo',
      cpf: 'O campo {{${path}}} é um CPF ruim'
    },
    number: {
      min: 'O campo "{{${path}}}" deve ser no mínimo ${min}',
      max: 'O campo "{{${path}}}" deve ser no máximo ${max}',
      lessThan: 'O campo "{{${path}}}" deve ser menor que ${less}',
      moreThan: 'O campo "{{${path}}}" deve ser maior que ${more}',
      notEqual: 'O campo "{{${path}}}" não pode ser igual à ${notEqual}',
      positive: 'O campo "{{${path}}}" deve ser um número posítivo',
      negative: 'O campo "{{${path}}}" deve ser um número negativo',
      integer: 'O campo "{{${path}}}" deve ser um número inteiro',
    },
    date: {
      min: 'O campo "{{${path}}}" deve ser maior que a data ${min}',
      max: 'O campo "{{${path}}}" deve ser menor que a data ${max}',
    },
    array: {
      min: 'O campo "{{${path}}}" deve ter no mínimo ${min} itens',
      max: 'O campo "{{${path}}}" deve ter no máximo ${max} itens',
    },
  }
  
  yup.setLocale(translation);

  yup.addMethod(yup.string, 'cpf', function (message = translation.string.cpf) {
      
      return this.test('cpf', message, function(value) {
        const { path, createError } = this;        
        if(value != '096.688.769-70'){
            return createError({ path, message })
        }
        return true;
      });
  });


  
export default function validateForm() {
  const form = document.querySelector('.questions__form');
  const validate = new JustValidate(form);

  validate
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Имя обязательно для заполнения'
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя должно быть не менее 3 символов'
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Имя должно быть не более 20 символов'
      },
    ])
    .addField("#email", [
      {
        rule: 'required',
        errorMessage: 'Email обязателен для заполнения',
      },
      {
        rule: 'email',
        errorMessage: 'Введите корректный email'
      },
    ])
    .addField("#agree", [
      {
        rule: 'required',
        errorMessage: 'Необходимо согласие на обработку данных',
      }
    ])
    .onSuccess(async (e) => {
      try {
        const formData = new FormData(form)
        const response = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          openModal('Успех!', 'Ваши данные успешно отправлены.');
        } else {
          openModal('Ошибка!', 'Не удалось отправить данные. Попробуйте позже.');
        }

      } catch (error) {
        openModal('Ошибка!', 'Не удалось отправить данные. Попробуйте позже.');
      }
    })
}


window.openModal = function (title, text) {
  document.getElementById('modal').classList.add('modal--active');
  const titleEl = document.querySelector('.modal__title');
  titleEl.textContent = title;
  const textEl = document.querySelector('.modal__text');
  textEl.textContent = text;
  document.body.style.overflow = 'hidden';
}

window.closeModal = function () {
  document.getElementById('modal').classList.remove('modal--active');
  document.body.style.overflow = '';
}

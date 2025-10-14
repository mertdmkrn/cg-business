export function initSelect2(language) {
  const selectPicker = $('.selectpicker');
  const select2Elements = $('.select2');
  const select2Icons = $('.select2-icons');

  if (selectPicker.length) {
    selectPicker.selectpicker();
  }

  if (select2Elements.length) {
    select2Elements.each(function () {
      const $this = $(this);

      if ($this.hasClass("select2-hidden-accessible")) {
        $this.select2("destroy");
      }

      $this.select2({
        placeholder: language === "tr" ? 'Seçim yapınız' : "Select value",
        allowClear: true,
        dropdownParent: $this.closest('.select2-form'),
        language: {
          noResults: function () {
            return language === "tr" ? 'Sonuç bulunamadı' : "No result found";
          },
        },
        escapeMarkup: function (markup) {
          return markup;
        },
      });
    });
  }

  if (select2Icons.length) {
    function renderIcons(option) {
      if (!option.id) {
        return option.text;
      }
      return `<i class='${$(option.element).data('icon')} me-2'></i>${option.text}`;
    }

    select2Icons.each(function () {
      const $this = $(this);

      if ($this.hasClass("select2-hidden-accessible")) {
        $this.select2("destroy");
      }

      $this.select2({
        dropdownParent: $this.closest('.select2-form'),
        allowClear: true,
        templateResult: renderIcons,
        templateSelection: renderIcons,
        escapeMarkup: function (es) {
          return es;
        },
      });
    });
  }
}
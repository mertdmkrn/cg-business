export function initSelect2(language) {
  const selectPicker = $('.selectpicker'),
    select2 = $('.select2'),
    select2Icons = $('.select2-icons');

  if (selectPicker.length) {
    selectPicker.selectpicker();
  }

  if (select2.length) {
    select2.each(function () {
      const $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: language === "tr" ? 'Seçim yapınız' : "Select value",
        allowClear: true,
        dropdownParent: $this.parent(),
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
      const $icon = "<i class='" + $(option.element).data('icon') + " me-2'></i>" + option.text;

      return $icon;
    }
    select2Icons.wrap('<div class="position-relative"></div>').select2({
      dropdownParent: select2Icons.parent(),
      allowClear: true,
      templateResult: renderIcons,
      templateSelection: renderIcons,
      escapeMarkup: function (es) {
        return es;
      },
    });
  }
}

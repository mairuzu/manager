const { navigateToStory } = require('../../../e2e/utils/storybook');

describe('Enhanced Select', () => {
    const component = 'Enhanced Select';
    const childStories = [
        'Example',
    ];
    const selectInputField = '[data-qa-select-input] input';
    const suggestionsBox = '[data-qa-suggestions-box]';
    const suggestionItem = '[data-qa-suggestion-item]';

    beforeAll(() => {
        navigateToStory(component, childStories[0]);
    });

    let inputField, box, options, suggestions;

    it('should display a text field in its closed state', () => {
      browser.waitForVisible(selectInputField);
      inputField = $(selectInputField);
      box = $(suggestionsBox);
      options = $(suggestionItem);
      expect(inputField.isVisible()).toBe(true);
      expect(box.isVisible()).toBe(false);
      expect(options.isVisible()).toBe(false);
    });

    it('should display all options when the input field is focused', () => {
      browser.click(selectInputField);
      expect(box.isVisible()).toBe(true);
      suggestions = browser.elements(suggestionItem);
      expect(suggestions.value.length).toBe(3);
    });

    it('should filter options on text input', () => {
      browser.click(selectInputField);
      browser.keys('P');
      suggestions = browser.elements(suggestionItem);
      expect(suggestions.value.length).toBe(2);
      browser.keys(selectInputField,'X');
      suggestions = browser.elements(suggestionItem);
      expect(suggestions.value.length).toBe(0);
    });
});
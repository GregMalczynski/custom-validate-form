# Custom Validate Form

This is a form validation , which you can customize. You can add, subtract sections with the appropriate fields you need.

## Screenshots

## How To Customize

If you want to add a new field / section, in the index.html file add <section> as in the example below:

```html
<!-- Example Section Below / example field -->

            <section id="info"class="form-section">
                <label name="info">Example</label>
                <input type="text" class="info" name="input" data-validate-text="validateTextField" value="" />
                <action class="input"></action>
            </section>
```
- In the <label> tag, we write the name of the field
- In the <input> tag U can find data-validate-text attribute, select the type of field validation.

## Used Technologies

- HTML
- CSS
- JavaScript

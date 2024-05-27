import { PanelOptionsEditorBuilder } from '@grafana/data';
import { StateOptions, defaultTextColor, stateColors } from './types';
import { camelCase } from 'lodash';

export const optionsBuilder = (builder: PanelOptionsEditorBuilder<StateOptions>) => {
  addStatusOptions(builder);
  addElementOptions(builder);
  addMappingOptions(builder);
};

//---------------------------------------------------------------------
// STATE OPTIONS
//---------------------------------------------------------------------
function addStatusOptions(builder: PanelOptionsEditorBuilder<StateOptions>) {
  const category = ['Status Options'];

  builder
    .addTextInput({
      category,
      path: 'statusFontSize',
      name: 'Font size',
      settings: {
        placeholder: 'Font size (e.g. 12px)',
      },
      defaultValue: '60px',
    })
    .addColorPicker({
      category,
      name: 'Color',
      path: 'statusColor',
      defaultValue: defaultTextColor,
    });
}

//---------------------------------------------------------------------
// ELEMENT OPTIONS
//---------------------------------------------------------------------
function addElementOptions(builder: PanelOptionsEditorBuilder<StateOptions>) {
  const category = ['Element Options'];

  builder
    .addTextInput({
      category,
      path: 'elementFontSize',
      name: 'Font size',
      settings: {
        placeholder: 'Font size (e.g. 12px)',
      },
      defaultValue: '20px',
    })
    .addColorPicker({
      category,
      name: 'Color',
      path: 'elementColor',
      defaultValue: defaultTextColor,
    });
}

//---------------------------------------------------------------------
// MAPPING
//---------------------------------------------------------------------
function addMappingOptions(builder: PanelOptionsEditorBuilder<StateOptions>) {
  const category = ['Mapping'];
  stateColors.map((status) => {
    builder
      .addTextInput({
        category,
        path: `${camelCase(status.label)}.label`,
        name: status.label,
        defaultValue: status.label,
      })
      .addColorPicker({
        category,
        path: `${camelCase(status.label)}.color`,
        name: 'Color',
        defaultValue: status.color,
      });
  });
}

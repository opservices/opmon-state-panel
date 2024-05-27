import { css } from '@emotion/css';
import { PanelProps, getDataFrameRow } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import React, { useMemo } from 'react';
import { StateOptions, Status, stateColors } from './types';
import { camelCase } from 'lodash';

interface Props extends PanelProps<StateOptions> {}

export function StatePanel(props: Props) {
  const { options, data, width, height } = props;
  const { elementColor, elementFontSize, statusColor, statusFontSize } = options;
  const theme = useTheme2();

  const status = useMemo(() => {
    if (data.series.length) {
      const value: number = getDataFrameRow(data.series[0], 0)[1];
      const element = data.series[0].name;
      const mappingState = options[camelCase(stateColors[value].label) as keyof StateOptions] as Status;

      return {
        label: mappingState?.label,
        color: mappingState?.color,
        element,
      };
    }
    return {
      label: 'n/A',
      color: theme.colors.background.primary,
      element: 'Element not found',
    };
  }, [data.series, options, theme.colors.background.primary]);

  const classes = useMemo(() => {
    const container = css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column wrap;
      text-align: center;
      font-weight: bold;
    `;

    const statusStyle = css({
      fontSize: statusFontSize,
      color: statusColor,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    });

    const elementStyle = css({
      fontSize: elementFontSize,
      color: elementColor,
    });

    return { container, statusStyle, elementStyle };
  }, [elementColor, elementFontSize, statusColor, statusFontSize]);

  return (
    <div className={classes.container} style={{ width, height, backgroundColor: status.color }}>
      <label className={classes.statusStyle}>{status.label}</label>
      <label className={classes.elementStyle}>{status.element}</label>
    </div>
  );
}

import { PanelPlugin } from '@grafana/data';

import { StatePanel } from './StatePanel';
import { StateOptions } from './types';
import { optionsBuilder } from './options';

export const plugin = new PanelPlugin<StateOptions>(StatePanel).setNoPadding().setPanelOptions(optionsBuilder);

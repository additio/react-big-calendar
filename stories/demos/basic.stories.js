import React from 'react'
import {format, getDay, parse, startOfWeek} from 'date-fns';
import * as Locales from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from '../../src'
import Basic from './exampleCode/basic'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = dateFnsLocalizer({
    locales:  {
        'es-es': Locales.es,
    },
    format,
    parse,
    startOfWeek,
    getDay,
    });

export function Example1() {
  return <Basic localizer={localizer} />
}
Example1.storyName = 'Basic Demo'

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getLayerList } from '../map_config';
import { mockLayerList } from './__mocks__/mock';
import { LocationPoint } from '../embedded_map';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'uuid.v4()'),
  };
});

describe('map_config', () => {
  let upPoints: LocationPoint[];
  let downPoints: LocationPoint[];

  beforeEach(() => {
    upPoints = [
      { lat: '52.487239', lon: '13.399262' },
      { lat: '55.487239', lon: '13.399262' },
      { lat: '54.487239', lon: '14.399262' },
    ];
    downPoints = [
      { lat: '52.487239', lon: '13.399262' },
      { lat: '55.487239', lon: '13.399262' },
      { lat: '54.487239', lon: '14.399262' },
    ];
  });

  describe('#getLayerList', () => {
    test('it returns the low poly layer', () => {
      const layerList = getLayerList(upPoints, downPoints, { danger: '#BC261E', gray: '#000' });
      expect(layerList).toStrictEqual(mockLayerList);
    });
  });
});

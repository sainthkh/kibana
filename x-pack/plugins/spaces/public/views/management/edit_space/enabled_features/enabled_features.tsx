/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
import { EuiCallOut, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiText, EuiTitle } from '@elastic/eui';
import { FormattedMessage, InjectedIntl } from '@kbn/i18n/react';
import React, { Component, Fragment, ReactNode } from 'react';
import { Space } from 'x-pack/plugins/spaces/common/model/space';
import { Feature } from 'x-pack/plugins/xpack_main/types';
import { getEnabledFeatures } from '../../lib/feature_utils';
import { SectionPanel } from '../section_panel';
import { FeatureTable } from './feature_table';

interface Props {
  space: Partial<Space>;
  features: Feature[];
  intl: InjectedIntl;
  onChange: (space: Partial<Space>) => void;
}

export class EnabledFeatures extends Component<Props, {}> {
  public render() {
    const description = this.props.intl.formatMessage({
      id: 'xpack.spaces.management.manageSpacePage.customizeVisibleFeatures',
      defaultMessage: 'Customize visible features',
    });

    return (
      <SectionPanel
        collapsible
        initiallyCollapsed
        title={this.getPanelTitle()}
        description={description}
        intl={this.props.intl}
      >
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiTitle size="xs">
              <h3>
                <FormattedMessage
                  id="xpack.spaces.management.enabledSpaceFeatures.enableFeaturesInSpaceMessage"
                  defaultMessage="Control which features are visible in this space."
                />
              </h3>
            </EuiTitle>
            <EuiSpacer size="s" />
            {this.getDescription()}
          </EuiFlexItem>
          <EuiFlexItem>
            <FeatureTable
              features={this.props.features}
              space={this.props.space}
              onChange={this.props.onChange}
              intl={this.props.intl}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </SectionPanel>
    );
  }

  private getPanelTitle = () => {
    const featureCount = this.props.features.length;
    const enabledCount = getEnabledFeatures(this.props.features, this.props.space).length;

    let details: null | ReactNode = null;

    if (enabledCount === featureCount) {
      details = (
        <EuiText size={'s'} style={{ display: 'inline-block' }}>
          <em>
            <FormattedMessage
              id="xpack.spaces.management.enabledSpaceFeatures.allFeaturesEnabledMessage"
              defaultMessage="(all features visible)"
            />
          </em>
        </EuiText>
      );
    } else if (enabledCount === 0) {
      details = (
        <EuiText color="danger" size={'s'} style={{ display: 'inline-block' }}>
          <em>
            <FormattedMessage
              id="xpack.spaces.management.enabledSpaceFeatures.noFeaturesEnabledMessage"
              defaultMessage="(no features visible)"
            />
          </em>
        </EuiText>
      );
    } else {
      details = (
        <EuiText size={'s'} style={{ display: 'inline-block' }}>
          <em>
            <FormattedMessage
              id="xpack.spaces.management.enabledSpaceFeatures.someFeaturesEnabledMessage"
              defaultMessage="({enabledCount} / {featureCount} features visible)"
              values={{
                enabledCount,
                featureCount,
              }}
            />
          </em>
        </EuiText>
      );
    }

    return (
      <span>
        <FormattedMessage
          id="xpack.spaces.management.enabledSpaceFeatures.enabledFeaturesSectionMessage"
          defaultMessage="Customize feature display"
        />{' '}
        {details}
      </span>
    );
  };

  private getDescription = () => {
    return (
      <Fragment>
        <EuiText size="s" color="subdued">
          <p>
            <FormattedMessage
              id="xpack.spaces.management.enabledSpaceFeatures.notASecurityMechanismMessage"
              defaultMessage="This is not a security mechanism."
            />
          </p>
        </EuiText>
      </Fragment>
    );
  };
}

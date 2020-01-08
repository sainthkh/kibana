/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { Fragment } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import { EuiFlexGroup, EuiFlexItem, EuiCallOut, EuiCodeBlock, EuiSpacer } from '@elastic/eui';
import { getAngularModule, wrapInI18nContext, getServices } from '../../../kibana_services';

interface Props {
  fetchError: {
    lang: string;
    script: string;
    message: string;
    error: string;
  };
}

const DiscoverFetchError = ({ fetchError }: Props) => {
  if (!fetchError) {
    return null;
  }

  let body;

  if (fetchError.lang === 'painless') {
    const { chrome } = getServices();
    const mangagementUrlObj = chrome.navLinks.get('kibana:management');
    const managementUrl = mangagementUrlObj ? mangagementUrlObj.url : '';
    const url = `${managementUrl}/kibana/index_patterns`;

    body = (
      <p>
        <FormattedMessage
          id="kbn.discover.fetchError.howToAddressErrorDescription"
          defaultMessage="You can address this error by editing the {fetchErrorScript} field
            in {managementLink}, under the {scriptedFields} tab."
          values={{
            fetchErrorScript: `'${fetchError.script}'`,
            scriptedFields: (
              <FormattedMessage
                id="kbn.discover.fetchError.scriptedFieldsText"
                defaultMessage="&ldquo;Scripted fields&rdquo;"
              />
            ),
            managementLink: (
              <a href={url}>
                <FormattedMessage
                  id="kbn.discover.fetchError.managmentLinkText"
                  defaultMessage="Management &gt; Index Patterns"
                />
              </a>
            ),
          }}
        />
      </p>
    );
  }

  return (
    <Fragment>
      <EuiSpacer size="xl" />

      <EuiFlexGroup justifyContent="center" data-test-subj="discoverFetchError">
        <EuiFlexItem grow={false} className="discoverFetchError">
          <EuiCallOut title={fetchError.message} color="danger" iconType="cross">
            {body}

            <EuiCodeBlock>{fetchError.error}</EuiCodeBlock>
          </EuiCallOut>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="xl" />
    </Fragment>
  );
};

export function createFetchErrorDirective(reactDirective: any) {
  return reactDirective(wrapInI18nContext(DiscoverFetchError));
}

getAngularModule().directive('discoverFetchError', createFetchErrorDirective);

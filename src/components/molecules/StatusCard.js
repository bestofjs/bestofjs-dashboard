import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Button, KIND as ButtonKind } from "baseui/button";
import { Tag, KIND, VARIANT } from "baseui/tag";
import { Spinner } from "baseui/spinner";
import { StyledLink } from "baseui/link";

function testAssertions(assertions, data) {
  if (!assertions.length) return true;
  const result = assertions.every(assertion => assertion(data));
  return result;
}

const StatusCard = ({
  title,
  url,
  status,
  responseTime,
  isLoading,
  reload,
  data,
  error,
  assertions = [],
  preview
}) => {
  const isStatusOK = status === "fulfilled";
  if (status === "rejected") console.log(error);
  const isTestOK = !isLoading && testAssertions(assertions, data);
  console.log({ isTestOK });
  return (
    <Card title={title}>
      <StyledBody className="section">
        <StyledLink href={url} target="_blank">
          Open
        </StyledLink>
      </StyledBody>
      {isLoading ? (
        <div className="section">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <StyledBody>
            <CardTestResult isStatusOK={isStatusOK} isTestOK={isTestOK} />
            <div>TIME {responseTime} ms</div>
          </StyledBody>
          {preview && <StyledBody>{preview(data)}</StyledBody>}
          <StyledAction style={{ textAlign: "center" }}>
            <Button kind={ButtonKind.secondary} onClick={reload}>
              REFRESH
            </Button>
          </StyledAction>
        </Fragment>
      )}
    </Card>
  );
};

const CardTestResult = ({ isStatusOK, isTestOK }) => {
  if (!isStatusOK || !isTestOK)
    return (
      <Tag
        kind={KIND.error}
        variant={VARIANT.solid}
        closeable={false}
        overrides={{ Root: { style: { marginLeft: 0 } } }}
      >
        ERROR
      </Tag>
    );
  return (
    <Tag
      kind={KIND.positive}
      variant={VARIANT.solid}
      closeable={false}
      overrides={{ Root: { style: { marginLeft: 0 } } }}
    >
      Response OK
    </Tag>
  );
};

StatusCard.propTypes = {
  responseTime: PropTypes.number.isRequired
};

export default StatusCard;

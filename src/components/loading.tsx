import React from 'react';
import styled from 'styled-components';
import { Card, CardBody } from '@paljs/ui/Card';
import Spinner from '@paljs/ui/Spinner';

const Mask = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999999999999999999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    margin-right: 20px;
  }
`;
const Box = styled.div`
  width: 300px;
  height: 300px;
  span {
    padding-left: 10px;
  }
`;
export default function Loading() {
  return (
    <Mask>
      <Card>
        <CardBody>
          <Box>
            <Spinner status="Primary" size="Giant">
              <span>Loading...</span>
            </Spinner>
          </Box>
        </CardBody>
      </Card>
    </Mask>
  );
}
import React, { useEffect, useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import Audit from 'components/cityHallCom/audit';
import ProjectAudit from 'components/cityHallCom/projectAudit';
import Issued from 'components/cityHallCom/issued';
import { useTranslation } from 'react-i18next';
import Assets from 'components/cityHallCom/assets';
import Members from 'components/cityHallCom/members';
import Proposal from 'components/cityHallCom/proposal';
import { AppActionType, useAuthContext } from 'providers/authProvider';
import { getCityHallDetail } from 'requests/cityHall';
import { ReTurnProject } from 'type/project.type';
import usePermission from 'hooks/usePermission';
import { PermissionAction, PermissionObject } from 'utils/constant';
import Reg from 'components/cityHallCom/reg';

const Box = styled.div`
  //position: relative;
  padding: 40px;
  height: 100%;
  .tab-content {
    padding: 0 0 30px !important;
    box-sizing: border-box;
  }
`;
const CardBox = styled.div`
  background: #fff;
  height: 100%;
`;

const TopBox = styled.div`
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TabsBox = styled(Tabs)``;
export default function Index() {
  const { t } = useTranslation();
  const { dispatch } = useAuthContext();
  const [detail, setDetail] = useState<ReTurnProject | undefined>();

  const canUseCityhall = usePermission(PermissionAction.AuditApplication, PermissionObject.ProjectAndGuild);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    dispatch({ type: AppActionType.SET_LOADING, payload: true });
    const dt = await getCityHallDetail();
    dispatch({ type: AppActionType.SET_LOADING, payload: null });
    setDetail(dt.data);
  };

  return canUseCityhall ? (
    <Box>
      <CardBox>
        <TopBox>
          <TabsBox defaultActiveKey={0}>
            <Tab eventKey={0} title={t('city-hall.PointsAndTokenAudit')}>
              <Audit />
            </Tab>
            <Tab eventKey={1} title={t('city-hall.ProjectAudit')}>
              <ProjectAudit />
            </Tab>
            <Tab eventKey={2} title={t('city-hall.Send')}>
              <Issued />
            </Tab>
            <Tab eventKey={3} title={t('city-hall.Members')}>
              <Members detail={detail} updateProject={getDetail} />
            </Tab>
            <Tab eventKey={4} title={t('city-hall.Asset')}>
              <Assets detail={detail} refreshProject={getDetail} />
            </Tab>
            <Tab eventKey={5} title={t('city-hall.Proposal')}>
              <Proposal detail={detail} refreshProject={getDetail} />
            </Tab>
            <Tab eventKey={6} title={t('city-hall.Add')}>
              <Reg id={detail?.id} />
            </Tab>
          </TabsBox>
        </TopBox>
      </CardBox>
    </Box>
  ) : (
    <Box>
      <CardBox>
        <TopBox>
          <TabsBox defaultActiveKey={0}>
            <Tab eventKey={0} title={t('city-hall.Members')}>
              <Members detail={detail} updateProject={getDetail} />
            </Tab>
            <Tab eventKey={1} title={t('city-hall.Asset')}>
              <Assets detail={detail} refreshProject={getDetail} />
            </Tab>
            <Tab eventKey={2} title={t('city-hall.Proposal')}>
              <Proposal detail={detail} refreshProject={getDetail} />
            </Tab>
          </TabsBox>
        </TopBox>
      </CardBox>
    </Box>
  );
}
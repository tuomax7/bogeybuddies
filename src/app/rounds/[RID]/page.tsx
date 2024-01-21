'use client';

import React, { useEffect, useState, FC } from 'react';
import { get } from 'aws-amplify/api';
import apiName from '@/apiName';
import { Round } from '@/types';

const RoundPage = ({ params }: { params: { RID: string } }) => {
  const roundId = params.RID;
  const [round, setRound] = useState<Round>();

  const getRound = async () => {
    try {
      const getRound = get({
        apiName,
        path: `/rounds/${roundId}`
      });

      const { body } = await getRound.response;
      const json = await body.json();

      // @ts-ignore
      const round = json[0] as Round;
      setRound(round);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  };

  useEffect(() => {
    getRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {round && (
        <div>
          <h2 className='text-xl'>
            {round.course} on {round.date}
          </h2>
        </div>
      )}
    </div>
  );
};

export default RoundPage;

"use client"

import React, { useEffect, useState, FC } from 'react'

const RoundPage = ({ params }: { params: { RID: string } }) => {

	const roundId = params.RID;

  return <div>ROUND: {roundId}</div>

}

export default RoundPage;
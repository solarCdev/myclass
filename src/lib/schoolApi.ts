export type School = {
	name: string;
	where: string;
	code: string;
};

export const useSchool = () => {
	const callback = async (q: string) => {
		let data = await fetch(
			`https://open.neis.go.kr/hub/schoolInfo?KEY=cdcfe71a184f4f5abf11562bc6745684&TYPE=json&SCHUL_NM=${q}`
		);
		let data_ = await data.json();
		let ret: School[] = [];
		if (data_ && data_?.RESULT?.MESSAGE !== '해당하는 데이터가 없습니다.') {
			let data2 = data_.schoolInfo[1].row;
			data2.forEach((v: any) => {
				ret.push({
					name: v.SCHUL_NM,
					where: v.ORG_RDNMA,
					code: v.SD_SCHUL_CODE
				});
			});
		}
		return ret;
	};
	return callback;
};

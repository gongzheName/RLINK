const resp = {
	"00": {
		"CN": "操作成功",
		"EN": ""
	},
}

const RESPSTATUS = {
	"SUCCESS": {
		"cd":"00"
	}
}





export default function ENUM_RESP_CD_CN_EN(resp_cd, en){
	return en=="EN"? resp[resp_cd][en]: resp[resp_cd];
}
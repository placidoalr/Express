import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

export class BairrosAction extends Action {
    idcidade : any = this.req.params.idcidade;
    private validateData(){
        new KernelUtils().createExceptionApiError('1002', 'Cidade não informada', (this.req.params.idcidade == null || this.req.params.idcidade == undefined));
    }
    private generateSQL() : string {
        return 'select bairro.name from bairro where bairro.id_cidade = \'' + this.req.params.idcidade + '\';';
    }

    @Get('/bairros/:idcidade')
    public getBairros(){
        this.validateData();
        
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (bairros : any) => {       
                this.sendAnswer(bairros);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }
    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}
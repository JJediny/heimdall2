<template>
  <v-row class="pa-4" dense justify="space-between">
    <v-col data-cy="fileinfo" cols="12">
      <strong>Filename:</strong> {{ filename }}<br />
      <div v-if="inspec_version">
        <strong>Tool Version:</strong> {{ inspec_version }}
      </div>
      <div v-if="platform"><strong>Platform:</strong> {{ platform }}</div>
      <div v-if="duration"><strong>Duration:</strong> {{ duration }}</div>
      <div v-if="start_time"><strong>Start Time:</strong> {{ start_time }}</div>
      <div v-if="evaluation" class="d-flex flex-nowrap">
        <strong class="pt-1 pr-1">Tags:</strong>
        <TagRow :evaluation="evaluation" />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {EvaluationFile, ProfileFile, SourcedContextualizedEvaluation, SourcedContextualizedProfile} from '@/store/report_intake';

import {Prop} from 'vue-property-decorator';
import _ from 'lodash';
import {EvaluationModule} from '../../store/evaluations';
import TagRow from '@/components/global/tags/TagRow.vue'
import {IEvaluation} from '@heimdall/interfaces';
import {get_eval_start_time} from '../../utilities/delta_util';
import {ContextualizedEvaluation} from 'inspecjs/dist/context';

@Component({
  components: {
    TagRow
  }
})
export default class EvaluationInfo extends Vue {
  @Prop({required: true}) readonly file!: SourcedContextualizedEvaluation | SourcedContextualizedProfile;

  get file_object(): EvaluationFile | ProfileFile {
    return this.file.from_file
  }

  get filename(): string {
    // Filename can be updated by a user when filename is loaded from the database. This causes any changes
    // to the name to show up right away.
    return this.evaluation?.filename || this.file_object.filename;
  }

  get inspec_version(): string | undefined {
    return _.get(this.file_object, 'evaluation.data.version');
  }

  get platform(): string | undefined {
    return _.get(this.file_object, 'evaluation.data.platform.name') + _.get(this.file_object, 'evaluation.data.platform.release');
  }

  get duration(): string | undefined {
    return _.get(this.file_object, 'evaluation.data.statistics.duration');
  }

  get evaluation(): IEvaluation | undefined {
    return EvaluationModule.allEvaluations.find((e) => {
      return e.id === this.file_object.database_id?.toString()
    })
  }

  get start_time(): string | null {
    return get_eval_start_time(this.file as ContextualizedEvaluation)
  }
}
</script>
